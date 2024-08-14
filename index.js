class Display {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;

    this.world = [...new Array(height)].map(() =>
      [...new Array(width)].map(() => 0),
    );
  }

  render() {
    const world = this.world;
    for (let y = 1; y < world.length; y += 2) {
      const worldNY = world[y];
      const worldBY = world[y - 1];

      console.log(
        worldNY
          .map((N, i) => {
            let A = worldBY[i];

            if (N && A) return "█";
            else if (A) return "▀";
            else if (N) return "▄";
            else return " ";
          })
          .join(""),
      );
    }
  }

  checkSize(x1, y1, x2, y2) {
    const width = this.wirdth;
    const height = this.height;

    if (x1 > width || x1 < 0) return;
    if (y1 > height || y1 < 0) return;

    if (arguments.length == 2) return true; // если 2 аргумента в функции то проверка окончена

    if (x2 > width || x2 < 0) return;
    if (y2 > height || y2 < 0) return;

    return true;
  }
}

class API extends Display {
  pixel(x, y) {
    if (!this.checkSize(x, y)) return;

    const world = this.world;

    world[y][x] = 1;
  }
  fill(x1, y1, x2, y2) {
    if (!this.checkSize(x1, y1, x2, y2)) return;

    const world = this.world;

    for (let y = y1; y <= y2; y++) {
      if (y > y2) break;

      const worldY = world[y];

      for (let x = x1; x <= x2; x++) {
        if (x > x2) break;

        world[x][y] = 1;
      }
    }
  }

  fillBorder(x1, y1, x2, y2) {
    if (!this.checkSize(x1, y1, x2, y2)) return;

    const world = this.world;

    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (y == y1) {
          world[y][x] = 1;
          continue;
        }

        if (y == y2) {
          world[y][x] = 1;
          continue;
        }
        world[y][0] = 1;
        world[y][x2] = 1;
      }
    }
  }
  drawLine(x1, y1, x2, y2) {
    if (!this.checkSize(x1, y1, x2, y2)) return;

    const world = this.world;

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      world[y1][x1] = 1; // Устанавливаем пиксель в 1
      if (x1 == x2 && y1 == y2) break; // Завершение после рисования линии
      const err2 = err * 2;
      if (err2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (err2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  }
}

const display = new API({ width: 50, height: 50 });
display.fillBorder(0, 0, 49, 49); // x1 y1 x2 y2
display.fill(5, 5, 10, 19);
display.drawLine(12, 12, 17, 28);
display.render();
// console.log(display.world);
