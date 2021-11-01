import { ApiPromise } from '@polkadot/api';

export type BholdusApiProvider = () => Promise<ApiPromise>;
