

export const LAYOUT_RESIZE = 'LAYOUT_RESIZE'

export function layoutResize(w,h) {
	return {
		type : LAYOUT_RESIZE,
		stage : { w, h }
	}
}