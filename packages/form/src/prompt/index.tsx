import { useCallback, useEffect } from "react";
import { useIntl } from "react-intl";
import { useBlocker } from "react-router";
import { useFormContext } from "react-hook-form";

export const PromptIfDirty = () => {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();
  const { formatMessage } = useIntl();

  const blocker = useBlocker(useCallback(() => isDirty && !isSubmitting, [isDirty, isSubmitting]));

  useEffect(() => {
    if (blocker.state === "blocked") {
      const shouldLeave = window.confirm(formatMessage({ id: "form.hints.prompt" }));

      if (shouldLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  return null;
};
