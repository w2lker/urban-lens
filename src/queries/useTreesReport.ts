import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodSize } from "@/getNeighborhoodSize";
import getUpscaledRate from "../getUpscaleRate";
const useTreesReports = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['treesReports'],
    queryFn: async () => {
      const response = await fetch('https://data.winnipeg.ca/resource/hfwk-jp4h.json?$select=neighbourhood&$where=neighbourhood IS NOT NULL&$limit=500000');
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.neighbourhood.toUpperCase();
        if (!reportsPerDistrict[district]) {
          reportsPerDistrict[district] = 0;
        }
        reportsPerDistrict[district]++;
      });

      Object.entries(reportsPerDistrict).forEach(([district, trees]: any) => {
        reportsPerDistrict[district] = trees / getNeighborhoodSize(district);
      });

      return getUpscaledRate(reportsPerDistrict);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default useTreesReports;
