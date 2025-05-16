/* eslint-disable */
// Rest of your file code
import type { ComponentRendering, ImageField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
// import { sitecoreLoader } from 'lib/sitecore-loader-override';
// import type { ColorKey } from 'styles-config';
// import { InformationBenefitsBoxWithSwoosh as Component } from 'ui/src/modules/feature-highlights/information-benefits-box-with-swoosh';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

type Item = {
  id: string;
  fields?: {
    Description?: TextField;
    Image?: ImageField;
    Title?: TextField;
  };
};

type TBenefitsValuesIconsProps = {
  rendering: ComponentRendering;
  fields?: {
    'Background Color'?: { fields?: { color: { value: any } } };
    // TODO: Deprecated remove field from sitecore template
    // 'Centered Alignment'?: Field<boolean>;
    Description?: TextField;
    Header?: TextField;
    Items?: Item[];
  };
};

export const BenefitsValuesIcons = (props: TBenefitsValuesIconsProps) => {
  const pro = props;
  console.log(pro);
  return <p>BVI</p>;
};

export const Default = withDatasourceCheck()<TBenefitsValuesIconsProps>(
  (props: TBenefitsValuesIconsProps) => {
    return <BenefitsValuesIcons {...props} />;
  }
);
