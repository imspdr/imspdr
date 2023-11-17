import { makeAutoObservable } from "mobx";
import { badge } from "./types";
import projectInfos from "./projects.json";

class MainStore {
  public badges: badge[];
  public windowWidth: number;
  public windowHeight: number;
  constructor(width: number, height: number) {
    this.windowWidth = width;
    this.windowHeight = height;
    this.badges = projectInfos;
    makeAutoObservable(this);
  }

  setPos = (id: number, x: number, y: number, ids: number[]) => {
    const movingBadge = this.badges.find((badge: badge) => badge.id === id);
    if (!movingBadge) return;
    const newX = Math.max(
      movingBadge.radius + 20,
      Math.min(x, this.windowWidth - movingBadge.radius - 20)
    );
    const newY = Math.max(
      movingBadge.radius + 20,
      Math.min(y, this.windowHeight - movingBadge.radius - 20)
    );
    if (ids.length > 0) {
      console.log(movingBadge.pos);
    }
    this.badges = this.badges.map((badge: badge) => {
      if (badge.id === id) {
        return {
          ...badge,
          pos: {
            x: newX,
            y: newY,
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
          if (dist < badge.radius) {
            return;
          } else {
            this.setPos(
              badge.id,
              badge.pos.x + ((badge.radius + movingBadge.radius - dist) * (badge.pos.x - x)) / dist,
              badge.pos.y + ((badge.radius + movingBadge.radius - dist) * (badge.pos.y - y)) / dist,
              [...ids, badge.id]
            );
          }
        }
      }
    });
  };
}

export default MainStore;
