<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Felipe',
            'surname' => 'Bertoli',
            'email' => 'felipe.bertoli@edu.unifil.br',
            'title' => 'Estudante de Ciência da Computação',
            'position' => 'Aluno',
            'gender' => 'Masculino',
            'birthday' => 28/05/03,
            'course_id' => 1,
            'status' => 'Ativo',
            'description'=> 'Lorem ipsum dolor sit amet. Qui facilis veniam vel assumenda enim eum iusto quia hic quos cumque et nobis eaque. Quo voluptate error
            aut ',
            'password' => Hash::make('abcd1234'),
            'picture_path' => 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
        ]);
        
    }
}
