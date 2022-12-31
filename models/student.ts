import {Class} from './class';
import {DisplaceException} from './disExept';
import { Grade } from './grade';
import { useQuery,gql } from "@apollo/client";
export interface Student{
    id:number,
    Grades:Grade[],
    Classes:Class[],
    DisplaceExceptions:DisplaceException[],
}

