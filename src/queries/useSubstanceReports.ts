import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodSize } from "../getNeighborhoodSize";
import getUpscaledRate from "../getUpscaleRate";

const useSubstanceReports = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['substanceReports'],
    queryFn: async () => {
      const response = await fetch('https://data.winnipeg.ca/resource/6x82-bz5y.json?$select=neighbourhood&$where=neighbourhood IS NOT NULL&$limit=500000');
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.neighbourhood.toUpperCase();
        if (!reportsPerDistrict[district]) {
          reportsPerDistrict[district] = 0;
        }
        reportsPerDistrict[district]++;
      });

      Object.entries(reportsPerDistrict).forEach(([district, substances]: any) => {
        reportsPerDistrict[district] = substances / getNeighborhoodSize(district);
      });

      return getUpscaledRate(reportsPerDistrict, true);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default useSubstanceReports;
