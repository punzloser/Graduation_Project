﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAPI.DTOs
{
    public class ActorDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime Dob { get; set; }

        public string Biography { get; set; }

        public string Picture { get; set; }
    }
}