import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodSize } from "@/getNeighborhoodSize";
import getUpscaledRate from "../getUpscaleRate";

const useBuildingPermitReport = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['buildingPermitReports'],
    queryFn: async () => {
      const response = await fetch('https://data.winnipeg.ca/resource/p5sy-gt7y.json?$select=total_permits,neighbourhood&$where=total_permits > 0 AND neighbourhood IS NOT NULL&$limit=500000');
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.neighbourhood.toUpperCase();
        if (!reportsPerDistrict[district]) {
          reportsPerDistrict[district] = 0;
        }
        reportsPerDistrict[district] += parseInt(item.total_permits);
      });

      Object.entries(reportsPerDistrict).forEach(([district, permits]: any) => {
        reportsPerDistrict[district] = permits / getNeighborhoodSize(district);
      });

      return getUpscaledRate(reportsPerDistrict);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default useBuildingPermitReport;
