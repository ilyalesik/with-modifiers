// @flow
import { applyStyleModifiers, styleModifierPropTypes } from "styled-components-modifiers";

export type TComponentWithModifiers<Modifier> = React$ComponentType<{
    modifiers?: Modifier | Array<Modifier | false> | false,
    children?: React$Node
}>;

export function withModifiers<T: { [string]: any }>(
    config: T,
): ((callback: (any) => any) => TComponentWithModifiers<$Keys<T>>) {
    return callback => {
        const result = callback(applyStyleModifiers(config));
        if (process.env.NODE_ENV !== 'production') {
            result.propTypes = {
                modifiers: styleModifierPropTypes(config),
            };
            result.possibleModifiers = Object.keys(config);
        }

        return result;
    };
}
