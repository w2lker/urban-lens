import useFireReports from './queries/useFireReports';
import usePoliceReports from './queries/usePoliceReports';
import useInvestmentsReport from './queries/useInvestmentsReport';
import useBuildingPermitReport from './queries/useBuildingPermitReport';
import useTreesReports from './queries/useTreesReport';
import useSubstanceReports from './queries/useSubstanceReports';
import useTransportationReport from './queries/useTransportationReport';
import usePotholesReport from './queries/usePotholesReport';
import { getNeighborhoodNames } from './getNeighborhoodSize';
import UserRate from './UserRate';

type ResultProps = {
  rate: UserRate;
};

const Result: React.FC<ResultProps> = ({ rate }) => {
  const { reportsPerNeighborhood: policeReports, isLoading: policeReportsLoading } = usePoliceReports();
  const { reportsPerNeighborhood: fireReports, isLoading: fireReportsLoading } = useFireReports();
  const { reportsPerNeighborhood: investmentsReports, isLoading: investmentsReportsLoading } = useInvestmentsReport();
  const { reportsPerNeighborhood: treesReports, isLoading: treesReportsLoading } = useTreesReports();
  const { reportsPerNeighborhood: potholesReports, isLoading: potholesReportsLoading } = usePotholesReport();
  const { reportsPerNeighborhood: buildingPermitReports, isLoading: buildingPermitReportsLoading } =
    useBuildingPermitReport();
  const { reportsPerNeighborhood: substanceReports, isLoading: substanceReportsLoading } = useSubstanceReports();
  const { reportsPerNeighborhood: transportationReports, isLoading: transportationReportsLoading } =
    useTransportationReport();

  if (
    policeReportsLoading ||
    fireReportsLoading ||
    investmentsReportsLoading ||
    treesReportsLoading ||
    potholesReportsLoading ||
    buildingPermitReportsLoading ||
    substanceReportsLoading ||
    transportationReportsLoading
  ) {
    return (
      <div className="flex justify-center items-center h-6">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (Object.values(rate).every((value) => value === 0)) {
    return <div>No data</div>;
  }

  const reportsMap: Record<keyof UserRate, Record<string, number>> = {
    policeRate: policeReports,
    fireRate: fireReports,
    investmentRate: investmentsReports,
    greenRate: treesReports,
    roadRate: potholesReports,
    pedestrianRate: transportationReports,
    publicTransportRate: buildingPermitReports,
    buildingRate: buildingPermitReports,
    substanceRate: substanceReports,
  };

  const getRate = (neighborhood: string, rateKey: keyof UserRate) =>
    (reportsMap[rateKey][neighborhood] || 0) * rate[rateKey];

  const getSortIndex = (neighborhood: string) => {
    const rates = Object.keys(rate).map((key) => getRate(neighborhood, key as keyof UserRate));
    return rates.reduce((acc, rate) => acc + rate, 0);
  };

  const sortedAreas = getNeighborhoodNames().sort((a, b) => getSortIndex(b) - getSortIndex(a));

  return (
    <div className="grid grid-cols-3 gap-4 mt-16">
      {sortedAreas.slice(0, 6).map((area) => (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{area}</h2>
            <div className="card-actions">
              <a
                className="btn btn-soft"
                target="_blank"
                href={`https://www.google.com/maps/place/${area.replace(' ', '+')}+winnipeg`}
              >
                Show on google
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Result;
