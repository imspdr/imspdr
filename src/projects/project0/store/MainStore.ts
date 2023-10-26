import { makeAutoObservable } from "mobx";
import { badge } from "./types";

class MainStore {
  public badges: badge[];
  constructor() {
    this.badges = [
      {
        id: 1,
        pos: {
          x: 200,
          y: 200,
        },
        radius: 100,
        title: "Project0 - 포트폴리오 페이지",
        description: "현재 화면 포트폴리오",
      },
      {
        id: 2,
        pos: {
          x: 500,
          y: 200,
        },
        radius: 100,
        title: "test2",
        description: "test description 2",
      },
    ];
    makeAutoObservable(this);
  }

  setPos = (id: number, x: number, y: number) => {
    const movingBadge = this.badges.find((badge: badge) => badge.id === id);
    if (!movingBadge) return;

    this.badges = this.badges.map((badge: badge) => {
      if (badge.id === id) {
        return {
          ...badge,
          pos: {
            x: x,
            y: y,
          },
        };
      } else {
        const dist = Math.sqrt(
          (badge.pos.x - x) * (badge.pos.x - x) + (badge.pos.y - y) * (badge.pos.y - y)
        );
        if (dist < badge.radius + movingBadge.radius) {
          return {
            ...badge,
            pos: {
              x:
                badge.pos.x +
                ((badge.radius + movingBadge.radius - dist) * (badge.pos.x - x)) / dist,
              y:
                badge.pos.y +
                ((badge.radius + movingBadge.radius - dist) * (badge.pos.y - y)) / dist,
            },
          };
        } else {
          return badge;
        }
      }
    });
  };
}

export default MainStore;
