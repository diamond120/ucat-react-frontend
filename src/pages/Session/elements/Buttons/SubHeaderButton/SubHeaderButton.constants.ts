import type { SubHeaderButtonTypes } from './SubHeaderButton.types';

import * as hotkeys from 'constants/hotkeys';

export const SUB_HEADER_BUTTON_HTMLS: Record<SubHeaderButtonTypes, string> = {
  answer: 'E<span class="hotkey">x</span>plain Answer',
  calculator: '<span class="hotkey">C</span>alculator',
  flag: '<span class="hotkey">F</span>lag for Review',
};

export const SUB_HEADER_BUTTON_HOTKEYS: Record<SubHeaderButtonTypes, string> = {
  answer: hotkeys.ANSWER,
  calculator: hotkeys.CALCULATOR,
  flag: hotkeys.FLAG,
};
