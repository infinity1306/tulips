import { motion } from 'framer-motion';
import type { FlowerType } from '@/store/useFlowerStore';
import { FlowerRegistry } from '../flowers/FlowerRegistry';
import { MapPin, Clock, Scissors, Info } from 'lucide-react';

interface FlowerDetail {
  type: FlowerType;
  name: string;
  description: string;
  origin: string;
  bloomTime: string;
  harvesting: string;
}

const flowerDetails: FlowerDetail[] = [
  {
    type: 'Rose',
    name: 'Rose',
    description: 'A woody perennial flowering plant of the genus Rosa, known for its beauty and fragrance. Cultivated for thousands of years, it is a universal symbol of love and passion.',
    origin: 'Asia, Europe, North America, and northwestern Africa',
    bloomTime: 'Late Spring to Early Autumn',
    harvesting: 'Cut early in the morning when the bud is just starting to open. Cut at a 45-degree angle just above a 5-leaf set.'
  },
  {
    type: 'Tulip',
    name: 'Tulip',
    description: 'Spring-blooming perennial herbaceous bulbiferous geophytes. They are known for their large, showy, and brightly colored flowers.',
    origin: 'Central Asia and Turkey (Later heavily cultivated in the Netherlands)',
    bloomTime: 'Early to Late Spring',
    harvesting: 'Harvest when the flower bud is fully colored but not yet open. Pull the entire plant including the bulb for maximum stem length, or cut leaving foliage.'
  },
  {
    type: 'Sunflower',
    name: 'Sunflower',
    description: 'Tall annuals or perennials that can grow to impressive heights. Their striking flower heads follow the sun\'s movement (heliotropism).',
    origin: 'North and Central America',
    bloomTime: 'Summer to Early Autumn',
    harvesting: 'Harvest when the petals begin to open and face outward. For seeds, wait until the back of the flower head turns brown and dry.'
  },
  {
    type: 'Lily',
    name: 'Lily',
    description: 'Tall perennials with prominent, often fragrant flowers. They are important in culture and literature across much of the world.',
    origin: 'Temperate northern hemisphere (Europe, Asia, North America)',
    bloomTime: 'Early Summer to Autumn (depending on variety)',
    harvesting: 'Cut when the first bud on the stem is showing full color and is just about to open. Remove the lower leaves that would sit in water.'
  },
  {
    type: 'Daisy',
    name: 'Daisy',
    description: 'Characterized by a star-shaped flower head, consisting of a central disc surrounded by delicate ray petals. Represents purity and innocence.',
    origin: 'Europe and Temperate regions of Asia',
    bloomTime: 'Spring to Early Summer',
    harvesting: 'Harvest fully opened flowers in the morning after dew has dried. Cut stems cleanly and place in cool water immediately.'
  },
  {
    type: 'Lavender',
    name: 'Lavender',
    description: 'A highly aromatic shrub known for its sweet, floral fragrance and beautiful purple spikes. Extensively used in culinary and therapeutic applications.',
    origin: 'Mediterranean region, Middle East, and India',
    bloomTime: 'Late Spring to Summer',
    harvesting: 'Harvest in the morning after dew has dried but before the sun gets too hot. Cut just above the woody base when bottom flowers are just opening.'
  },
  {
    type: 'CherryBlossom',
    name: 'Cherry Blossom',
    description: 'Also known as Sakura, these delicate pink and white flowers bloom on ornamental cherry trees. Highly celebrated in Japanese culture symbolizing the fleeting nature of life.',
    origin: 'East Asia (Primarily Japan, China, and Korea)',
    bloomTime: 'Early to Mid Spring',
    harvesting: 'Rarely harvested for vases as they are delicate and short-lived. Branches can be carefully pruned right before buds open to force blooming indoors.'
  }
];

export function MyFlowersScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="absolute inset-0 z-20 pointer-events-auto overflow-y-auto"
      style={{
        background: 'rgba(10, 10, 15, 0.45)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-4xl mx-auto p-4 md:p-8 pt-8 md:pt-12 pb-32">
        <h1 className="text-3xl md:text-5xl font-serif text-white/95 mb-2 font-medium tracking-wide">
          My Flowers
        </h1>
        <p className="text-white/70 mb-8 font-sans">
          Discover detailed information about every beautiful bloom in your garden.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {flowerDetails.map((flower, idx) => (
            <motion.div
              key={flower.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              className="bg-black/30 border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:bg-black/40 transition-colors"
            >
              {/* Image Section */}
              <div className="h-48 md:h-64 overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-pink-500/10 to-purple-500/10">
                <img 
                  src={FlowerRegistry[flower.type]} 
                  alt={flower.name} 
                  className="w-full h-full object-contain p-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-out filter drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <h2 className="absolute bottom-4 left-6 text-3xl font-serif text-white">
                  {flower.name}
                </h2>
              </div>

              {/* Details Section */}
              <div className="p-6 flex flex-col gap-5 text-white/80 font-sans">
                <p className="text-sm leading-relaxed text-white/70 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 shrink-0 opacity-50" />
                  {flower.description}
                </p>

                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-white/40 font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> Origin
                    </span>
                    <span className="text-sm">{flower.origin}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-white/40 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> Bloom Time
                    </span>
                    <span className="text-sm">{flower.bloomTime}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wider text-emerald-400/60 font-semibold flex items-center gap-1.5">
                      <Scissors className="w-3 h-3" /> Harvesting
                    </span>
                    <span className="text-sm">{flower.harvesting}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
