/* eslint-disable */
// Rest of your file code
import type {
  ComponentRendering,
  Field,
  ImageField,
  LinkField,
  RichTextField,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type TImageContentBlock = {
  rendering: ComponentRendering;
  fields?: {
    Description?: RichTextField;
    Image?: ImageField;
    Link?: LinkField;
    'Link Tracking Name'?: TextField;
    Title?: TextField;
    'Link Title'?: TextField;
    Reverse?: Field<boolean>;
  };
};

const Component = (props: TImageContentBlock) => {
  const pro = props;
  console.log(pro);
  return <p>ImageContentBlock</p>;
};

export const Default = (props: TImageContentBlock) => {
  return <Component {...props} />;
};

export const StackedContentBlock = (props: TImageContentBlock) => {
  return <Component {...props} />;
};

