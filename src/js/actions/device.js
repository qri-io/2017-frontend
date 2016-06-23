

export const DEVICE_RESIZE = 'DEVICE_RESIZE'

export function resizeDevice(width,height) {
	return {
		type : DEVICE_RESIZE,
		value : { width, height }
	}
}