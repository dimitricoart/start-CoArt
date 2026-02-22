import { TabsProps as MuiTabsProps, useMediaQuery } from "@mui/material";
import { ReactElement, ReactNode, SyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";

import { StyledRoot, StyledTab, StyledTabs } from "./styled";

interface IButtonTabsProps<T extends string> extends Omit<MuiTabsProps, "onChange" | "value" | "content"> {
  options: Array<T>;
  defaultValue?: T;
  onChange?: (value: string) => void;
  content?: Record<T, ReactNode>;
  tabIcon?: string | ReactElement;
  iconPosition?: "top" | "bottom" | "start" | "end";
}

export const ButtonTabs = <T extends string>(props: IButtonTabsProps<T>) => {
  const { options, defaultValue, content, tabIcon, iconPosition = "end", onChange, ...restProps } = props;
  const isMd = useMediaQuery(theme => theme.breakpoints.down("md"));

  const [tabValue, setTabValue] = useState(() => {
    return defaultValue ? options.indexOf(defaultValue) : 0;
  });

  const onHandleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (onChange) {
      onChange(options[newValue]);
    }
  };

  const contentKey = options[tabValue];

  return (
    <StyledRoot>
      <StyledTabs
        value={tabValue}
        onChange={onHandleChange}
        variant={isMd ? "scrollable" : "standard"}
        scrollButtons={false}
        {...restProps}
      >
        {options.map(o => (
          <StyledTab
            key={o}
            icon={tabIcon}
            iconPosition={iconPosition}
            label={<FormattedMessage id={`components.tabs.${o}`} tagName={"p"} />}
          />
        ))}
      </StyledTabs>
      {content?.[contentKey]}
    </StyledRoot>
  );
};
