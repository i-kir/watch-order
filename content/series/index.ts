import type { Series } from '@/lib/types';
import { mcu } from './mcu';
import { starWars } from './star-wars';
import { wizardingWorld } from './wizarding-world';
import { xMen } from './x-men';
import { fastFurious } from './fast-furious';

export const seriesList: Series[] = [mcu, starWars, wizardingWorld, xMen, fastFurious];
