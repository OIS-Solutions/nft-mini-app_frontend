import { TNftItemUri } from "@/shared/types/nft";
import { NftItemUriTemplate } from "../constants";

export const setNftUri = (formValues: TNftItemUri) => ({...NftItemUriTemplate, ...formValues})