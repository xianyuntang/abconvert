import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

import { Product, Version } from '../../orm';

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const PRODUCT_ID = 'zJNGtZELDJvvdiTMTW5Aw';

    const product = em.create(Product, {
      id: PRODUCT_ID,
      name: 'shampoo',
    });

    em.create(Version, {
      product: product,
      primary: true,
      details: [
        { key: 'title', value: 'Chebe Hair Butter' },
        { key: 'price1', value: '20' },
        { key: 'price2', value: '20' },
        { key: 'price3', value: '16' },
        {
          key: 'description',
          value:
            'Perfect for hair moisturizaztion, strength, growth \n' +
            'Prevents split ends, breakage, dry hair\n' +
            'Zero-water formula means your hair can absorb full benefits of organic, natural ingredients\n' +
            '100% natural chebe powder extract from Africa\n' +
            'Used by women from Africa for hair length and retention for centuries',
        },
        { key: 'feature1', value: 'Powerful Moisturization' },
        { key: 'feature2', value: 'Prevent breakage and split ends' },
        { key: 'feature3', value: 'Strengthen & lengthen hair' },
      ],
    });
  }
}
