/*import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,Column } from "typeorm";
import { Equipos } from "./equipos.dtos";
//import { Integrantes } from "./integrantes.dtos";
import { Roles } from "./roles.dtos";

@Entity()
export class EquipoIntegranteRol {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Equipos, equipo => equipo.equipoIntegrantes)
  @JoinColumn()
  equipo?: Equipos;

  @Column({ name: 'correoIntegrante' }) // Asegúrate de que el nombre de la columna sea correcto
  correoIntegrante: string;

  @Column({ name: 'equipoIdEquipos' }) // Asegúrate de que el nombre de la columna sea correcto
  equipoIdEquipos: number;

  @ManyToOne(() => Roles, rol => rol.equipoIntegrantes)
  @JoinColumn()
  rol?: Roles;
}
*/
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Equipos } from "./equipos.dtos";
import { Roles } from "./roles.dtos";

@Entity()
export class EquipoIntegranteRol {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Equipos, equipo => equipo.equipoIntegrantes, { onDelete: 'CASCADE' })
  @JoinColumn()
  equipo?: Equipos;

  @Column({ name: 'correoIntegrante' })
  correoIntegrante: string;

  @Column({ name: 'equipoIdEquipos' })
  equipoIdEquipos: number;

  @ManyToOne(() => Roles, rol => rol.equipoIntegrantes)
  @JoinColumn()
  rol?: Roles;
}