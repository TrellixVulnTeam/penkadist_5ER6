import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SingleMatch} from '../interfaces/single-match';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MatchesService {
    matches: Observable<SingleMatch[]>;
    private matchesCollection: AngularFirestoreCollection<SingleMatch>;

    constructor(private readonly afs: AngularFirestore) {
        this.matchesCollection = afs.collection<SingleMatch>('singleMatches', ref => ref.orderBy('startDate', 'asc'));
        this.getMatches();
    }

    private getMatches(): void {
        this.matches = this.matchesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as SingleMatch;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    saveMatch(match: SingleMatch, matchId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = matchId || this.afs.createId();
                const data = {id, ...match};
                const result = await this.matchesCollection.doc(id).set(data);
                resolve(result);
            } catch (err) {
                reject(err.message);
            }
        });
    }

    deleteMatch(matchId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.matchesCollection.doc(matchId).delete();
                resolve(result);
            } catch (err) {
                reject(err.message);
            }
        });
    }
}
