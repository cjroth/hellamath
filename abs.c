int absolute(double one[], double two[], double *out, int length) {
    int i;
    for (i = 0; i < length; i++) {
        out[i] = one[i] + two[i];
    }
    return 0;
}
