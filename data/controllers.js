import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const openDatabase = async () => {
  const dbPath = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/data.db');
  if (dbPath.exists)
    return SQLite.openDatabase('data.db')
  else {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite',
      { intermediates: true }
    );
    await FileSystem.downloadAsync(
      Asset.fromModule(require('../assets/db/data.db')).uri,
      FileSystem.documentDirectory + 'SQLite/data.db'
    );
    return SQLite.openDatabase('data.db');
  }
}

export const getItemsFromResearch = async (research) => {
  const db = await openDatabase();
  const optimizedResearch = research.replace(/\s/g, '%');
  const accentRegex = /[\u0300-\u036f]/g;
  let request;

  if (accentRegex.test(optimizedResearch.normalize("NFD")))
    request =
      "SELECT alim_nom_fr AS name, alim_code AS id, alim_grp_nom_fr AS categoryName, " +
      "alim_ssgrp_nom_fr AS typeName, alim_ssgrp_code AS typeId " +
      "FROM aliments " +
      "WHERE alim_nom_fr LIKE '" + optimizedResearch + "%' " +
      "OR alim_nom_fr LIKE '% " + optimizedResearch + "%' " +
      "GROUP BY alim_code, alim_nom_fr, alim_grp_nom_fr, alim_ssgrp_nom_fr, alim_ssgrp_code " +
      "ORDER BY CASE WHEN alim_nom_fr LIKE '" + optimizedResearch + "%' " +
      "then 0 else 1 end, Length(alim_nom_fr), alim_nom_fr"
    ;
  else
    request =
      "SELECT alim_nom_fr AS name, alim_code AS id, alim_grp_nom_fr AS categoryName, " +
      "alim_ssgrp_nom_fr AS typeName, alim_ssgrp_code AS typeId, nom_sans_accents " +
      "FROM aliments " +
      "WHERE nom_sans_accents LIKE '" + optimizedResearch + "%' " +
      "OR nom_sans_accents LIKE '% " + optimizedResearch + "%' " +
      "GROUP BY alim_code, alim_nom_fr, alim_grp_nom_fr, alim_ssgrp_nom_fr, alim_ssgrp_code, nom_sans_accents " +
      "ORDER BY CASE WHEN alim_nom_fr LIKE '" + optimizedResearch + "%' " +
      "then 0 else 1 end, Length(alim_nom_fr), alim_nom_fr"
    ;

  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        request,
        [],
        (tx, res) => resolve(res.rows._array),
        (tx, error) => { alert(error); reject(error) }
      );
    });
  });
}

export const getItemDetail = async (id) => {
  const db = await openDatabase();
  const request = "SELECT * FROM aliments WHERE alim_code = " + id;

  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        request,
        [],
        (tx, res) => resolve(res.rows.item(0)),
        (tx, error) => reject(error)
      );
    });
  });
}
