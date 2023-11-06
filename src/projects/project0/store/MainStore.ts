import { makeAutoObservable } from "mobx";
import { badge } from "./types";

class MainStore {
  public badges: badge[];
  constructor() {
    this.badges = [
      {
        id: 0,
        pos: {
          x: 200,
          y: 200,
        },
        radius: 100,
        title: "Project0 - 포트폴리오 페이지",
        description: "현재 화면 포트폴리오",
        route: "",
      },
      {
        id: 1,
        pos: {
          x: 500,
          y: 200,
        },
        radius: 100,
        title: "Project1 - N퀸 문제",
        description: "P=NP와 N퀸 문제",
        route: "chess",
      },
      {
        id: 2,
        pos: {
          x: 800,
          y: 200,
        },
        radius: 100,
        title: "Project2 - sort 시각화",
        description: "sort 시각화",
        route: "sort",
      },
    ];
    makeAutoObservable(this);
  }

  setPos = (id: number, x: number, y: number, ids: number[]) => {
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
        return badge;
      }
    });
    this.badges.forEach((badge: badge) => {
      if (badge.id !== id && !ids.includes(badge.id)) {
        const dist = Math.sqrt(
          (badge.pos.x - x) * (badge.pos.x - x) + (badge.pos.y - y) * (badge.pos.y - y)
        );
        if (dist < badge.radius + movingBadge.radius) {
          this.setPos(
            badge.id,
            badge.pos.x + ((badge.radius + movingBadge.radius - dist) * (badge.pos.x - x)) / dist,
            badge.pos.y + ((badge.radius + movingBadge.radius - dist) * (badge.pos.y - y)) / dist,
            [...ids, badge.id]
          );
        }
      }
    });
  };
}

export default MainStore;
