export default class InputState {
    constructor() {
        this.left = false;
        this.right = false;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    keydown = (e) => {
        if (e.code === "ArrowLeft") this.left = true;
        if (e.code === "ArrowRight") this.right = true;
    };

    keyup = (e) => {
        if (e.code === "ArrowLeft") this.left = false;
        if (e.code === "ArrowRight") this.right = false;
    };
}
