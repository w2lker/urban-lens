import { useQuery } from "@tanstack/react-query";
import getUpscaledRate from "../getUpscaleRate";
const useTransportationReport = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transportationReports'],
    queryFn: async () => {
      const response = await fetch('https://data.winnipeg.ca/resource/ijxa-tybv.json?$select=public_total,walk_total,bicycle_total,total,boundary_name&$where=total%20%3E%200%20AND%20boundary_type=%27Neighbourhood%27%20AND%20boundary_name%20IS%20NOT%20NULL&$limit=500000');
      const data = await response.json();
      const reportsPerDistrict: any = {};
      data.forEach((item: any) => {
        const district = item.boundary_name.toUpperCase();
        reportsPerDistrict[district] = {
          pedestrianFriendly: (item.walk_total + item.bicycle_total) / item.total,
          publicTransport: item.public_total / item.total,
        }
      });

      return getUpscaledRate(reportsPerDistrict);
    }
  })

  return { reportsPerNeighborhood: data as Record<string, number>, isLoading, error };
}

export default useTransportationReport;
