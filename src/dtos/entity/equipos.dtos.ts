import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { EquipoIntegranteRol } from "./equipoIntegranteRol.dto";

@Entity()
export class Equipos {
  
  @PrimaryGeneratedColumn()
  idEquipos: number;
  
  @Column()
  name: string;
  
  @Column({ nullable: true })
  proyecto: string;

  @Column()
  correoCreador: string;

  @OneToMany(() => EquipoIntegranteRol, equipoIntegrante => equipoIntegrante.equipo, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn(/*{ name: 'equipoIdEquipos' }*/) // Agrega esto si es necesario para la relación
  equipoIntegrantes?: EquipoIntegranteRol[];
}