import { getDesignTokens } from '../../shared-theme/themePrimitives';

import { inputsCustomizations } from '../../shared-theme/customizations/inputs';
import { dataDisplayCustomizations } from '../../shared-theme/customizations/dataDisplay';
import { feedbackCustomizations } from '../../shared-theme/customizations/feedback';
import { navigationCustomizations } from '../../shared-theme/customizations/navigation';
import { surfacesCustomizations } from '../../shared-theme/customizations/surfaces';

export default function getSignUpTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  };
}