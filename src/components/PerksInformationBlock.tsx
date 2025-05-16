/* eslint-disable */
// Rest of your file code
import type {
  ComponentRendering,
  ImageField,
  LinkField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

type TItem = {
  id: string;
  fields?: {
    Image?: ImageField;
    Title?: TextField;
  };
};

type TInformationBenefitsBoxWithSwooshProps = {
  rendering: ComponentRendering;
  fields?: {
    'Background Color'?: { fields?: { color: { value: any } } };
    Description?: TextField;
    Heading?: TextField;
    Items?: TItem[];
    Link: LinkField;
    'Link Tracking Name'?: TextField;
  };
};

export const InformationBenefitsBoxWithSwoosh = (props: TInformationBenefitsBoxWithSwooshProps) => {
  const pro = props;
  console.log(pro);
  return <p>Perk</p>;
};

export const Default = withDatasourceCheck()<TInformationBenefitsBoxWithSwooshProps>(
  (props: TInformationBenefitsBoxWithSwooshProps) => {
    return <InformationBenefitsBoxWithSwoosh {...props} />;
  }
);

