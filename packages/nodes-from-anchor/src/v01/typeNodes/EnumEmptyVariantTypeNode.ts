import { EnumEmptyVariantTypeNode, enumEmptyVariantTypeNode } from '@soidl/nodes';

import { IdlV01EnumVariant } from '../idl';

export function enumEmptyVariantTypeNodeFromAnchorV01(idl: IdlV01EnumVariant): EnumEmptyVariantTypeNode {
    return enumEmptyVariantTypeNode(idl.name ?? '');
}
