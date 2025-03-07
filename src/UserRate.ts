type UserRate = {
  policeRate: number;
  fireRate: number;
  substanceRate: number;
  buildingRate: number;
  investmentRate: number;
  greenRate: number;
  roadRate: number;
  pedestrianRate: number;
  publicTransportRate: number;
}

const defaultUserRate: UserRate = {
  policeRate: 50,
  fireRate: 50,
  substanceRate: 50,
  buildingRate: 50,
  investmentRate: 50,
  greenRate: 50,
  roadRate: 50,
  pedestrianRate: 50,
  publicTransportRate: 50,
};

export { defaultUserRate };
export default UserRate;
