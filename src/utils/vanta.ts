
import BIRDS  from 'vanta/dist/vanta.birds.min';

import FOG from 'vanta/src/vanta.fog';

import CELLS from 'vanta/src/vanta.cells';

import WAVES from 'vanta/src/vanta.waves';

import CLOUDS from 'vanta/src/vanta.clouds';

import CLOUDS2 from 'vanta/src/vanta.clouds2';

import GLOBE from 'vanta/src/vanta.globe';

import NET from 'vanta/src/vanta.net';

import TRUNK from 'vanta/src/vanta.trunk';

import TOPOLOGY from 'vanta/src/vanta.topology';

import DOTS from 'vanta/src/vanta.dots';

import RINGS from 'vanta/src/vanta.rings';

import HALO from 'vanta/src/vanta.halo';

const vantaInfo = reactive([
    {
        name: 'birds',
        component: BIRDS,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00
        }
    },
    {
        name: 'fog',
        component: FOG,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00
        }
    },
    {
        name: 'waves',
        component: WAVES,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00
        }
    },
    {
        name: 'clouds',
        component: CLOUDS,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00
        }
    },
    {
        name: 'clouds2',
        component: CLOUDS2,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            texturePath: ""
        }
    },
    {
        name: 'globe',
        component: GLOBE,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x18f256,
            color2: 0xfd4ff,
            size: 0.60,
            backgroundColor: 0x64
        }
    },
    {
        name: 'net',
        component: NET,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xaca6de,
            points: 20.00,
            maxDistance: 12.00,
            spacing: 12.00
        }
    },
    {
        name: 'cells',
        component: CELLS,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00
        }
    },
    {
        name: 'trunk',
        component: TRUNK,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00
          
        }
    },
    {
        name: 'topology',
        component: TOPOLOGY,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00
          
        }
    },
    {
        name: 'dots',
        component: DOTS,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00
          
        }
    },
    {
        name: 'rings',
        component: RINGS,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xe82
          
        }
    },
    {
        name: 'halo',
        component: HALO,
        props: {
            el: "",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00
          
        }
    },

])

export const vanta = (el: any, name: string, props: any={}) => {
    const vantaInstance = vantaInfo.find(vanta => vanta.name === name)
    if (vantaInstance) {
        const info = {
            ...vantaInstance.props,
            ...props,
             el: el,
             waveHeight: '100%'
        }
        console.log(info)
        return vantaInstance.component(info)
    }

}