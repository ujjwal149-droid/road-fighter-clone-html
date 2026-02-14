export default class InputState {
    constructor() {
        this.left = false;
        this.right = false;
        this.enter = false;
        this.x = false;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    keydown = (e) => {
        if (e.code === "ArrowLeft") this.left = true;
        if (e.code === "ArrowRight") this.right = true;
        if (e.code === "Enter") this.enter = true;
        if (e.code === "KeyX") this.x = true;
    };

    keyup = (e) => {
        if (e.code === "ArrowLeft") this.left = false;
        if (e.code === "ArrowRight") this.right = false;
        if (e.code === "Enter") this.enter = false;
        if (e.code === "KeyX") this.x = false;
    };
}
