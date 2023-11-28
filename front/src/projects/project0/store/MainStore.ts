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
    this.badges = this.badges.map((badge: badge) => {
      const savedBadge = sessionStorage.getItem(badge.title);
      if (savedBadge) {
        return {
          ...badge,
          pos: JSON.parse(savedBadge),
        };
      } else {
        return badge;
      }
    });
    makeAutoObservable(this);
  }

  rearrange = () => {
    const radius = Math.min(...this.badges.map((badge: badge) => badge.radius));
    const maxIndex = Math.round((this.windowWidth - radius - 20) / (radius * 2 + 20));
    this.badges = this.badges.map((badge: badge, index: number) => {
      const yIndex = Math.floor(index / maxIndex);
      const xIndex = index % maxIndex;
      //console.log(`${badge.title} : ${xIndex} ${yIndex}`);
      return {
        ...badge,
        pos: {
          x: badge.radius + 20 + xIndex * (badge.radius * 2 + 20),
          y: badge.radius + 20 + 64 + yIndex * (badge.radius * 2 + 20),
        },
      };
    });
    this.badges = this.badges.map((badge: badge) => {
      const savedBadge = sessionStorage.getItem(badge.title);
      if (savedBadge) {
        return {
          ...badge,
          pos: JSON.parse(savedBadge),
        };
      } else {
        return badge;
      }
    });
  };

  setRadius = (id: number, radius: number) => {
    this.badges = this.badges.map((badge: badge) => {
      if (badge.id === id) {
        return {
          ...badge,
          radius: radius,
        };
      } else return badge;
    });
  };

  setPos = (id: number, x: number, y: number, ids: number[]) => {
    const movingBadge = this.badges.find((badge: badge) => badge.id === id);
    if (!movingBadge) return;
    const maxX = this.windowWidth - movingBadge.radius - 20;
    const maxY = this.windowHeight - movingBadge.radius - 20;
    const newX = Math.max(movingBadge.radius + 20, Math.min(x, maxX));
    const newY = Math.max(movingBadge.radius + 20, Math.min(y, maxY));
    sessionStorage.setItem(movingBadge.title, JSON.stringify(movingBadge.pos));

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
