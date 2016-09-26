// #include<stdio.h>
#include <stdlib.h>

int absolute(double in[], double *out, int length) {
    int i;
    for (i = 0; i < length; i++) {
        out[i] = (double) abs((int) in[i]);
        // printf("%i %f\n", i, a[i]);
    }
    return 0;
}


// #include<stdio.h>
//
// int max(double a[], double *out) {
//     int i;
//     for (i = 0; i < 3; i++) {
//         out[i] = a[i];
//         printf("%i %f\n", i, a[i]);
//     }
//     return 0;
// }
