export enum ResizeMode {
    Min = 0,
    Max = 1
}

class ImageResizer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
    }

    async resizeImage(base64Image: string, size: number, mode: ResizeMode = ResizeMode.Min) {
        if (size <= 0) return base64Image;

        const image = await this.loadImage(base64Image);

        if (image.width < size && image.height < size)
            return base64Image;

        const { width, height } = this.getNewDimensions(image, size, mode);
        const format = this.getImageFormat(base64Image);

        const resizedBase64 = this.canvasResize(image, width, height, format);
        return resizedBase64;
    }

    loadImage(base64Image: string): Promise<HTMLImageElement> {
        const promise = new Promise<HTMLImageElement>((res, rej) => {
            const image = new Image();
            image.onload = (ev) => res(ev.target as HTMLImageElement);
            image.src = base64Image;
        });
        return promise;
    }

    getNewDimensions(image: HTMLImageElement, size: number, mode: ResizeMode = ResizeMode.Min) {
        if (
            mode == ResizeMode.Min && image.width < image.height ||
            mode == ResizeMode.Max && image.width > image.height
        ) {
            return {
                width: size,
                height: Math.round((size * image.height) / image.width),
            };
        }
        else {
            return {
                width: Math.round((size * image.width) / image.height),
                height: size,
            };
        }
    }

    getImageFormat(base64Image: string) {
        if (!base64Image.startsWith("data:"))
            return "image/png"; // default

        const startIndex = "data:".length;
        const endIndex = base64Image.indexOf(';');

        return base64Image.substring(startIndex, endIndex);
    }

    canvasResize(image: HTMLImageElement, width: number, height: number, format: string) {
        if (!this.canvas || !this.context)
            throw new Error("Canvas has not been initialized ! Cannot resize the image !");

        this.canvas.width = width;
        this.canvas.height = height;

        this.context.drawImage(image, 0, 0, width, height);
        return this.canvas.toDataURL(format);
    }
}

export const ImageResizerInstance = new ImageResizer();