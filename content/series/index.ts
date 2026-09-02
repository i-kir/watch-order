import type { Series } from '@/lib/types';
import { mcu } from './mcu';
import { starWars } from './star-wars';
import { wizardingWorld } from './wizarding-world';
import { xMen } from './x-men';
import { fastFurious } from './fast-furious';
import { middleEarth } from './middle-earth';
import { alien } from './alien';
import { planetOfTheApes } from './planet-of-the-apes';
import { terminator } from './terminator';
import { conan } from './conan';

export const seriesList: Series[] = [
  mcu,
  starWars,
  wizardingWorld,
  xMen,
  fastFurious,
  middleEarth,
  alien,
  planetOfTheApes,
  terminator,
  conan,
];
