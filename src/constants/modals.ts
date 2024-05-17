import * as hotkeys from 'constants/hotkeys';

export enum MODAL_BUTTON_TYPES {
  Yes = 'Yes',
  No = 'No',
  Ok = 'Ok',
  Close = 'Close',
}

export const MODAL_BUTTON_HTMLS: Record<MODAL_BUTTON_TYPES, string> = {
  [MODAL_BUTTON_TYPES.Yes]: '<span class="hotkey">Y</span>es',
  [MODAL_BUTTON_TYPES.No]: '<span class="hotkey">N</span>o',
  [MODAL_BUTTON_TYPES.Ok]: '<span class="hotkey">O</span>k',
  [MODAL_BUTTON_TYPES.Close]: '<span class="hotkey">C</span>lose',
};

export const MODAL_BUTTON_HOTKEYS: Record<MODAL_BUTTON_TYPES, string> = {
  [MODAL_BUTTON_TYPES.Yes]: hotkeys.YES,
  [MODAL_BUTTON_TYPES.No]: hotkeys.NO,
  [MODAL_BUTTON_TYPES.Ok]: hotkeys.OK,
  [MODAL_BUTTON_TYPES.Close]: hotkeys.CLOSE,
};
