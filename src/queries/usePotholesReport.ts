import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodSize } from "../getNeighborhoodSize";
import getUpscaledRate from "../getUpscaleRate";

const usePotholesReport = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['potholesReports'],
    queryFn: async () => {
      const response = await fetch('https://data.winnipeg.ca/resource/4mat-mb3w.json?$select=potholes,neighbourhood&$where=potholes > 0 AND neighbourhood IS NOT NULL&$limit=500000');
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.neighbourhood.toUpperCase();
        if (!reportsPerDistrict[district]) {
          reportsPerDistrict[district] = 0;
        }
        reportsPerDistrict[district] += parseInt(item.potholes);
      });

      Object.entries(reportsPerDistrict).forEach(([district, potholes]: any) => {
        reportsPerDistrict[district] = potholes / getNeighborhoodSize(district);
      });

      return getUpscaledRate(reportsPerDistrict);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default usePotholesReport;
