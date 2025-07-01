<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Str;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('courses')->insert([
            ['name' => 'Administração'],
            ['name' => 'Agronomia'],
            ['name' => 'Análise e Desenvolvimento de Sistemas'],
            ['name' => 'Arquitetura e Urbanismo'],
            ['name' => 'Biomedicina'],
            ['name' => 'Ciência da Computação'],
            ['name' => 'Ciências Contábeis'],
            ['name' => 'Ciência de Dados e Inteligência Artificial'],
            ['name' => 'Design Gráfico'],
            ['name' => 'Direito'],
            ['name' => 'Educação Física'],
            ['name' => 'Enfermagem'],
            ['name' => 'Engenharia Civil'],
            ['name' => 'Engenharia de Software'],
            ['name' => 'Engenharia Elétrica'],
            ['name' => 'Estética e Cosmética'],
            ['name' => 'Farmácia'],
            ['name' => 'Fisioterapia'],
            ['name' => 'Gastronomia'],
            ['name' => 'Gestão Ambiental'],
            ['name' => 'Gestão Comercial'],
            ['name' => 'Gestão de Recursos Humanos'],
            ['name' => 'Gestão do Agronegócio'],
            ['name' => 'Gestão Financeira'],
            ['name' => 'Gestão Pública'],
            ['name' => 'Letras Português-Inglês'],
            ['name' => 'Logística'],
            ['name' => 'Marketing'],
            ['name' => 'Marketing Digital'],
            ['name' => 'Medicina Veterinária'],
            ['name' => 'Ministério Pastoral'],
            ['name' => 'Nutrição'],
            ['name' => 'Pedagogia'],
            ['name' => 'Processos Gerenciais'],
            ['name' => 'Psicanálise'],
            ['name' => 'Psicologia'],
            ['name' => 'Radiologia'],
            ['name' => 'Serviços Jurídicos'],
            ['name' => 'Teologia']
        ]);

        // DB::table('users')->insert(
        //     [
        //         [
        //             'name' => 'Usuário',
        //             'surname' => "Teste",
        //             'email' => 'usuario.teste@filhub.com',
        //             'title' => 'Usuário Teste do Filhub',
        //             'position' => null,
        //             'gender' => 'Outros',
        //             'birthday' => '2003/05/28',
        //             'course_id' => null,
        //             'status' => 'Ativo',
        //             'description' => '',
        //             'password' => Hash::make('password'),
        //             'picture_path' => ''
        //         ]
        //     ]
        // );

        // // Additional 20 users
        // for ($i = 1; $i <= 20; $i++) {
        //     DB::table('users')->insert([
        //         'name' => 'User' . $i,
        //         'surname' => 'Surname' . $i,
        //         'email' => 'user' . $i . '@example.com',
        //         'title' => 'Title ' . $i,
        //         'position' => 'Position ' . $i,
        //         'gender' => 'Outros',
        //         'birthday' => '2000/01/' . str_pad($i, 2, '0', STR_PAD_LEFT),
        //         'course_id' => ($i % 2 == 0) ? rand(1, 39) : null,
        //         'status' => 'Ativo',
        //         'description' => 'Description for User ' . $i,
        //         'password' => Hash::make('password'),
        //         'picture_path' => ''
        //     ]);
        // }

        // // relationship seeding
        // for ($i = 6; $i <= 10; $i++) {
        //     DB::table('relationship')->insert([
        //         'type' => 'Following',
        //         'user_id' => $i,
        //         'related_id' => 1,
        //     ]);
        // }

        // for ($i = 11; $i <= 15; $i++) {
        //     DB::table('relationship')->insert([
        //         'type' => 'Following',
        //         'user_id' => 1,
        //         'related_id' => $i,
        //     ]);
        // }

        // for ($i = 16; $i <= 25; $i++) {
        //     DB::table('relationship')->insert([
        //         'type' => 'Following',
        //         'user_id' => $i,
        //         'related_id' => 1,
        //     ]);
        //     DB::table('relationship')->insert([
        //         'type' => 'Following',
        //         'user_id' => 1,
        //         'related_id' => $i,
        //     ]);
        // }

        // // Posts seeding
        // for ($i = 1; $i <= 25; $i++) {
        //     DB::table('posts')->insert([
        //         'type' => 'post',
        //         'status' => 'Postado',
        //         'author_id' => $i,
        //         'course_id' => ($i % 2 == 0) ? rand(1, 39) : null,
        //         'send_time' => now(),
        //         'description' => 'Description for post by user ' . $i,
        //         // 'media_path' => json_encode([]),
        //         'media_path' => null
        //     ]);

        //     if ($i % 2 == 0) {
        //         for ($j = 0; $j < rand(0, 3); $j++) {
        //             DB::table('posts')->insert([
        //                 'type' => 'post',
        //                 'status' => 'Postado',
        //                 'author_id' => $i,
        //                 'course_id' => rand(1, 39),
        //                 'send_time' => now(),
        //                 'description' => 'Additional description for post by user ' . $i,
        //                 // 'media_path' => json_encode([]),
        //                 'media_path' => null
        //             ]);
        //         }
        //     }
        // }
    }
}
