import type { FooterButtonTypes } from './FooterButton.types';

import * as hotkeys from 'constants/hotkeys';

export const FOOTER_BUTTON_HTMLS: Record<FooterButtonTypes, string> = {
  next: '<span class="hotkey">N</span>ext',
  prev: '<span class="hotkey">P</span>revious',
  navigator: 'Na<span class="hotkey">v</span>igator',
  end_exam: '<span class="hotkey">E</span>nd Exam',
  end_section: '<span class="hotkey">E</span>nd Section',
  return_overview: '<span class="hotkey">R</span>eturn to Overview',
};

export const FOOTER_BUTTON_HOTKEYS: Record<FooterButtonTypes, string> = {
  next: hotkeys.NEXT,
  prev: hotkeys.PREV,
  navigator: hotkeys.NAVIGATOR,
  end_exam: hotkeys.END_EXAM,
  end_section: hotkeys.END_SECTION,
  return_overview: hotkeys.RETURN_OVERVIEW,
};
