import { Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { nanoid } from 'nanoid';

/**
 *  To get around this while preserving the strict type checking.
 *  You should inherit this class in all entities.
 *  https://github.com/mikro-orm/guide#generics-to-the-rescue
 */
export abstract class CustomBaseEntity {
  @PrimaryKey({ length: 21 })
  id = nanoid();

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
