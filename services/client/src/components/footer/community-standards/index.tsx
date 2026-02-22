import { Link } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router";

import { ROUTES } from "../../../routes/routes";

export const CommunityStandardsLink = () => {
  return (
    <Link
      component={RouterLink}
      to={ROUTES.COMMUNITY_STANDARDS}
      sx={{
        color: "common.white",
        textDecoration: "none",
      }}
      target="_blank"
    >
      <FormattedMessage id="components.footer.communityStandards" />
    </Link>
  );
};
