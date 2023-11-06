import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,Column } from "typeorm";
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

  
  @Column()
  correoIntegrante: string;

  @Column()
  equipoIdEquipos: number;

  @ManyToOne(() => Roles, rol => rol.equipoIntegrantes)
  @JoinColumn()
  rol?:Roles;
}
/*
  @ManyToOne(() => Integrantes, integrante => integrante.equipoIntegrantes)
  @JoinColumn()
  integrante?: Integrantes;
  */