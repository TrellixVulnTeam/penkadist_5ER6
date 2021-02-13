import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Competition} from '../../interfaces/competition';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {
    competitions: Observable<Competition[]>;
    competitionCollection: AngularFirestoreCollection<Competition>;

    constructor(private afs: AngularFirestore) {
        this.competitionCollection = afs.collection<Competition>('competitions', ref => ref.orderBy('name'));
        this.getCompetitions();
    }

    getCompetitions(): void {
        this.competitions = this.competitionCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Competition;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    saveCompetition(competition: Competition, competitionId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const id = competitionId || this.afs.createId();
                const data = {id, ...competition};
                const result = await this.competitionCollection.doc(id).set(data);
                resolve(result);
            } catch (err) {
                reject(err.message);
            }
        });
    }


    deleteCompetition(competitionId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.competitionCollection.doc(competitionId).delete();
                resolve(result);
            } catch (err) {
                reject(err.message);
            }
        });
    }
}
