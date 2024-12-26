import { Flex } from 'ui/src/components/layout';
const shineKeyframe = `
  @keyframes shine {
    from {
      -webkit-mask-position: 150%;
    }
    to {
      -webkit-mask-position: -50%;
    }
  }
`;
export function Shine({ children, disabled, ...rest }) {
    return (<>
      <style>{shineKeyframe}</style>
      <Flex {...rest} style={disabled
            ? undefined
            : {
                WebkitMaskImage: `linear-gradient(-75deg, rgba(0,0,0,0.5) 30%, #000 50%, rgba(0,0,0,0.5) 70%)`,
                WebkitMaskSize: '200%',
                animation: 'shine 1s linear infinite',
            }}>
        {children}
      </Flex>
    </>);
}
//# sourceMappingURL=Shine.jsx.map