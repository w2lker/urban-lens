import { useQuery } from "@tanstack/react-query";
import getNeighborhoodPopulation from "../getPopulation";
import getUpscaledRate from "../getUpscaleRate";

const usePoliceReports = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['policeReports'],
    queryFn: async () => {
      const response = await fetch('https://data.winnipeg.ca/resource/4her-3th5.json?$select=neighbourhood&$where=neighbourhood IS NOT NULL&$limit=500000');
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.neighbourhood.toUpperCase();
        if (!reportsPerDistrict[district]) {
          reportsPerDistrict[district] = 0;
        }
        reportsPerDistrict[district]++;
      });

      Object.entries(reportsPerDistrict).forEach(([district, police]: any) => {
        reportsPerDistrict[district] = police / getNeighborhoodPopulation(district);
      });

      return getUpscaledRate(reportsPerDistrict, true);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default usePoliceReports;
