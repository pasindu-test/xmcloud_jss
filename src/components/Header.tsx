/* eslint-disable */
// Rest of your file code
import type { Field, LinkField, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  utilityLink: LinkField;
  displayUtilityBar: Field<boolean>;
  link: LinkField;
  helperText: Field<string>;
}

type HeaderProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields?: Fields;
};

const HeaderDefaultComponent = (props: HeaderProps): JSX.Element => {
  return (
    <div className={`component header ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">No datasource present</span>
      </div>
    </div>
  );
};

export const Default = (props: HeaderProps) => {
  return <HeaderDefaultComponent {...props} />;
};
