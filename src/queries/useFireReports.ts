import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodSize } from "@/getNeighborhoodSize";
import getUpscaledRate from "../getUpscaleRate";

const useFireReports = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fireReports'],
    queryFn: async () => {
      const response = await fetch("https://data.winnipeg.ca/resource/yg42-q284.json?$select=neighbourhood&$where=incident_type='Fire Rescue - Outdoor' AND neighbourhood IS NOT NULL&$limit=500000");
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.neighbourhood.toUpperCase();
        if (!reportsPerDistrict[district]) {
          reportsPerDistrict[district] = 0;
        }
        reportsPerDistrict[district]++;
      });

      Object.entries(reportsPerDistrict).forEach(([district, fires]: any) => {
        reportsPerDistrict[district] = fires / getNeighborhoodSize(district);
      });

      return getUpscaledRate(reportsPerDistrict, true);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default useFireReports;
