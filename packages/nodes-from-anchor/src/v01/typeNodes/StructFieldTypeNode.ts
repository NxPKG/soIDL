import { SOIDL_ERROR__ANCHOR__UNRECOGNIZED_IDL_TYPE, SoidlError } from '@soidl/errors';
import { StructFieldTypeNode, structFieldTypeNode } from '@soidl/nodes';

import { IdlV01Field, IdlV01Type } from '../idl';
import { typeNodeFromAnchorV01 } from './TypeNode';

export function structFieldTypeNodeFromAnchorV01(idl: IdlV01Field | IdlV01Type): StructFieldTypeNode {
    if (!isStructField(idl)) {
        throw new SoidlError(SOIDL_ERROR__ANCHOR__UNRECOGNIZED_IDL_TYPE, {
            idlType: JSON.stringify(idl),
        });
    }

    return structFieldTypeNode({
        docs: idl.docs ?? [],
        name: idl.name,
        type: typeNodeFromAnchorV01(idl.type),
    });
}

function isStructField(field: IdlV01Field | IdlV01Type): field is IdlV01Field {
    return typeof field === 'object' && 'name' in field && 'type' in field;
}
