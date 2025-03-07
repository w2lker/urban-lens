import UserRate from '../UserRate';
import FormItem from './FormItem';

type FormProps = {
  rate: UserRate;
  onChange: (rate: UserRate) => void;
};

const Form: React.FC<FormProps> = ({ rate, onChange }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="space-y-4">
        <FormItem
          label="Building Rate"
          value={rate.buildingRate}
          onChange={(value) => onChange({ ...rate, buildingRate: value })}
        />
        <FormItem
          label="Investment Rate"
          value={rate.investmentRate}
          onChange={(value) => onChange({ ...rate, investmentRate: value })}
        />
        <FormItem
          label="Green Rate"
          value={rate.greenRate}
          onChange={(value) => onChange({ ...rate, greenRate: value })}
        />
      </div>

      <div className="space-y-4">
        <FormItem
          label="Police Rate"
          value={rate.policeRate}
          onChange={(value) => onChange({ ...rate, policeRate: value })}
        />
        <FormItem
          label="Fire Rate"
          value={rate.fireRate}
          onChange={(value) => onChange({ ...rate, fireRate: value })}
        />
        <FormItem
          label="Substance Rate"
          value={rate.substanceRate}
          onChange={(value) => onChange({ ...rate, substanceRate: value })}
        />
      </div>

      <div className="space-y-4">
        <FormItem
          label="Pedestrian Rate"
          value={rate.pedestrianRate}
          onChange={(value) => onChange({ ...rate, pedestrianRate: value })}
        />
        <FormItem
          label="Public Transport Rate"
          value={rate.publicTransportRate}
          onChange={(value) => onChange({ ...rate, publicTransportRate: value })}
        />
        <FormItem
          label="Road Rate"
          value={rate.roadRate}
          onChange={(value) => onChange({ ...rate, roadRate: value })}
        />
      </div>
    </div>
  );
};

export default Form;
